import uniqid from 'uniqid'

const announcementList = [
    {
        "title" : "Site Maintenance",
        "content" : "Mailchimp nudges users to take action with personalized messages",
        "id": uniqid()
    },
    {
        "title" : "Community Share Day",
        "content" : "GoToWebinar walks users through a new feature step by step",
        "id": uniqid()
    },
    {
        "title" : "Updated Privacy Policy",
        "content" : "GoToWebinar walks users through a new feature step by step",
        "id": uniqid()
    },
]

const Announcements = () => {
  return (
    <div className='py-4 px-8 pb-4'>
        <div className="font-bold text-xl">Announcements</div>
        <div className='bg-white shadow-md border flex flex-col justify-center rounded-xl p-4 my-5'>
            {announcementList.map(announcement => (
                <div className='py-4' key={announcement.id}>
                    <div className='font-bold text-lg'>{announcement.title}</div>
                    <div className='border-b-2 pb-6'>{announcement.content}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Announcements
