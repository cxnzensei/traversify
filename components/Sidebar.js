import Icon from '@mdi/react';
import { 
    mdiHome, 
    mdiAlphabetAurebesh, 
    mdiCardAccountDetailsOutline, 
    mdiClockTimeThreeOutline,
    mdiNoteMultiple,
    mdiAccountGroup,
    mdiCog,
    mdiHelpBox,
    mdiShieldCheck, 
    mdiBookHeart,
    mdiLogoutVariant,
} from '@mdi/js';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = ({ user }) => {

    const router = useRouter()

    const items = [
        { path: mdiHome, text: 'Home', link: '/' },
        { path: mdiCardAccountDetailsOutline, text: 'Profile', link: `/traversify/${user?.user_id}` },
        { path: mdiBookHeart, text: 'Readlist', link: '/readlist' },
        { path: mdiClockTimeThreeOutline, text: 'History', link: '' },
        { path: mdiNoteMultiple, text: 'Tasks', link: '' },
        { path: mdiAccountGroup, text: 'Communities', link: '' },
        { path: mdiCog, text: 'Settings', link: '' },
        { path: mdiHelpBox, text: 'Questions', link: '' },
        { path: mdiShieldCheck, text: 'Privacy', link: '' },
        { path: mdiLogoutVariant, text: 'Logout', link: '/login' },
    ]

    return (
        <div className='bg-black min-w-max h-screen lg:pr-12 text-white'>
            <div className='px-2 py-4'>
                <div>
                    <Link href='/'>
                        <div className='flex items-center'>
                            <div className='dashIcon'>
                                <Icon path={mdiAlphabetAurebesh} rotate={90} size={2} />
                            </div>
                            <div className='dashText'>Traversify</div> 
                        </div>
                    </Link>
                    <div className='mt-12'>
                        {items.map(item => (
                            <div key={item.text} onClick={() => {
                                if(item.text === 'Logout') {
                                    localStorage.setItem('token', null)
                                    router.push('/login')
                                }
                            }}>
                                <Link href={item.link}>
                                    <div className={`main ${(item.text == 'Readlist' || item.text == 'Communities') && 'pb-10'}`}>
                                        <div className='dashIcon'>
                                            <Icon path={item.path} size={1} />
                                        </div>
                                        <div className='dashText'>{item.text}</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
