import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request loading
  const [requests, setRequests] = useState(60);
  const [loading, setLoading] = useState(false);
  //error
  const [error, setError] = useState({ show: false, msg: "" });

  // search user
  const searchUser = async (user) => {
    toggleError(); // toggle error (if exhists remove it), because of default parameters(show:false,msg:"") only invoke function
    setLoading(true);

    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url, repos_url } = response.data;

      await Promise.allSettled([
        // run function from then only when both requests are settled
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      toggleError(true, "there is no user with that name");
    }
    checkRequests();
    setLoading(false);
  };
  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining }, // double destructuring, rate from data obj, and then remaining from rate obj
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, you've reached your hourly request limit!");
        }
      })
      .catch((error) => console.log(error));
  };

  //error function
  const toggleError = (show = false, msg = "") => {
    // (show = false, msg = "") - default
    setError({ show, msg });
  };

  useEffect(() => {
    checkRequests();
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        loading,
        error,
        searchUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
