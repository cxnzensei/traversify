import Header from "./Header"
import Announcements from "./Announcements"
import Trending from "./Trending"

const Main = ({ user }) => {
  return (
    <div className="w-full h-screen bg-[#fafafa] overflow-y-scroll">
      <Header user={user} />
      <div>
          <Trending />
          <Announcements />
      </div>
    </div>
  )
}

export default Main