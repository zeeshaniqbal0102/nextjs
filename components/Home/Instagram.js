import instaStyles from './Instagram.module.css'
import Image from 'next/image'

function Instagram() {
    return (
        <section className={instaStyles.insta}>
            <h2>Follow us on Instagram</h2>
            <div className={instaStyles.instaContainer}>
                <div className={instaStyles.instaImg}>
                    <Image
                        src='/images/instagram-1.png'
                        width={480}
                        height={480}
                        alt='Instagram Image'
                    />
                </div>
                <div className={instaStyles.instaImg}>
                    <Image
                        src='/images/instagram-2.png'
                        width={480}
                        height={480}
                        alt='Instagram Image'
                    />
                </div>
                <div className={`${instaStyles.instaImg} displayNoneAtMobile`}>
                    <Image
                        src='/images/instagram-3.png'
                        width={480}
                        height={480}
                        alt='Instagram'
                    />
                </div>
                <div className={`${instaStyles.instaImg} displayNoneAtMobile`}>
                    <Image
                        src='/images/instagram-4.png'
                        width={480}
                        height={480}
                        alt='Instagram'
                    />
                </div>
            </div>
            <a
                href='https://instagram.com'
                className={` ${instaStyles.follow} btn btnDark`}
            >
                <span>Follow</span>
            </a>
        </section>
    )
}

export default Instagram
