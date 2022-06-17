import Link from 'next/link'

const NAVLINKS = [
    {
        name: 'work',
        link: '/work',
    },
    {
        name: 'dev',
        link: 'https://github.com/jiito',
    },
    {
        name: 'writing',
        link: 'https://words.benji.ar/',
    },
]

export const NavBar = () => {
    return (
        <>
            <div className="nav">
                <nav>
                    {NAVLINKS.map((item, i, arr) => (
                        <Link href={item.link} key={i}>
                            {'/' + item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    )
}
