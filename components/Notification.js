const Notification = ({ notification, setNotification }) => {

    if(notification.length > 0) {
        return (
            <div className="py-7 pl-7 pr-10 relative bg-gray-400 rounded-t-lg font-semibold w-max border-b-8 border-gray-600">
                <div>{notification}</div>
                <div onClick={() => setNotification('')} className="absolute cursor-pointer right-3 top-2 px-2 bg-white rounded-full">x</div>
            </div>
        )
    }

}

export default Notification
