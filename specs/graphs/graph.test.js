// following code is example of breadth first search on graphs
// graph data present in jobs.js file represents basic social network of professionals 
// findMostCommonTitle method will return most common job profiles in network from any given \
// user with given degree of separation 
/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example
  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser, getMe } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  const jobTitles = {}
  const user = getUser(myId)
  const searchedUsers = []
  let userQueue = []
  userQueue.push(myId)
  // userQueue = [...userQueue, ...user.connections]
  while (degreesOfSeparation >= 0) {
    const queueLength = userQueue.length
    for (let i = 0; i < queueLength; i++) {
      if (searchedUsers.indexOf(userQueue[0]) === -1) {
        let tempUser = getUser(userQueue[0])
        if (jobTitles[tempUser.title]) {
          jobTitles[tempUser.title] += 1
        }
        else {
          jobTitles[tempUser.title] = 1
        }
        searchedUsers.push(userQueue.shift())
        userQueue = [...userQueue, ...tempUser.connections]
      } else {
        userQueue.shift()
      }
    }
    degreesOfSeparation--
  }
  let mostCommonJob = null
  console.log(jobTitles)
  for (const jobTitle in jobTitles) {
    if (!mostCommonJob) {
      mostCommonJob = jobTitle
    }
    if (jobTitles[mostCommonJob] < jobTitles[jobTitle]) {
      mostCommonJob = jobTitle
    }
  }
  return mostCommonJob
};

// unit tests
test("user 11 with 3 degrees of separation", () => {
  expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
});

test("user 307 with 4 degrees of separation", () => {
  // if you're failing here with "Clinical Specialist, you're probably not filtering users who
  // appear more than once in people's connections
  expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
});

test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
  expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
});
