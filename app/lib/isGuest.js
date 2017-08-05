export default function isGuest(users) {

  if(users.contains("Andrew") &&
     users.contains("Xiaoyun") &&
     users.contains("Kyle")) {
       return false
  } else {
    return true
  }
}
