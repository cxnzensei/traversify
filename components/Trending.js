import uniqid from 'uniqid'
import Image from 'next/image'

const trendingList = [
    {
        "img" : "/assets/cat2.jpg",
        "username" : "@tegan",
        "tag": "World Peace Builder",
        "id" : uniqid()
    },
    {
        "img" : "/assets/cat1.jpg",
        "username" : "@morgan",
        "tag": "Super Cool Project",
        "id" : uniqid()
    },
    {
        "img" : "/assets/cat4.jpg",
        "username" : "@kendall",
        "tag": "Life Changing App",
        "id" : uniqid()
    },
    {
        "img" : "/assets/cat5.jpg",
        "username" : "@alex",
        "tag": "No Traffic Maker",
        "id" : uniqid()
    },
]

const Trending = () => {
  return (
    <div className="px-8 py-6 pt-6">
      <div className="font-bold text-xl">Trending</div>
      <div className='bg-white grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 shadow-md border-2 rounded-xl p-4'>
          {trendingList.map(profile => (
              <div key={profile.id} className='flex items-center space-x-3'>
                    <div className='md:w-20 md:h-20 w-12 h-12'>
                        <Image 
                            className='rounded-full object-cover' 
                            src={profile.img} 
                            alt={profile.username}
                            height={200}
                            width={200} 
                        />
                    </div>
                    <div>
                        <p className='font-bold tracking-wider'>{profile.username}</p>
                        <p className='text-gray-500 font-semibold'>{profile.tag}</p>
                    </div>
              </div>
          ))}
      </div>
    </div>
  )
}

export default Trending
