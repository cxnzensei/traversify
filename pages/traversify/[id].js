import axios from 'axios'
import { useRouter } from 'next/router'

const Profile = ({ user }) => {
    return (
        <div className='flex flex-col space-y-4'>
            <div>
                {user.username}
            </div>
            <div>
                {user.user_id}
            </div>
            <div>
                {user.house}
            </div>
            <div>
                {user.email}
            </div>
            <div>
                {user.firstname}
            </div>
            <div>
                {user.lastname}
            </div>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const id = params.id
    const response = await axios.get(`http://localhost:3000/api/users/${id}`)
    return {
        props: {"user": response.data[0]}
    }
}

export default Profile
