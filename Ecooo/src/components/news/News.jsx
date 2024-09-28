import React, { useRef, useState } from 'react'
import './News.css'
import Next_icon from '../../assets/next-icon.png'
import Back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/news1.jpg'
import user_2 from '../../assets/news3.jpg'
import user_3 from '../../assets/news4.jpg'
import user_4 from '../../assets/news5.jpg'

const News = () => {
    const slider = useRef(null);
    const [tx, setTx] = useState(0);

    const slideForward = () => {
        if (tx > -50) {
            setTx(prevTx => prevTx - 33.3);
        }
    }

    const slideBackward = () => {
        if (tx < 0) {
            setTx(prevTx => prevTx + 33.3);
        }
    }

    return (
        <div className='news'>

            <div className="newsp">
            <p>Latest News</p>
            </div>
            <img src={Next_icon} alt="Next" className='next-btn' onClick={slideForward} />
            <img src={Back_icon} alt="Back" className='back-btn' onClick={slideBackward} />
            <div className="slider">
                <ul ref={slider} style={{ transform: `translateX(${tx}%)` }}>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_1} alt="User 1" />
                                <div>
                                    <h3>William</h3>
                                    <span>Educity USA</span>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae mollitia tempore, quas laudantium asperiores placeat illum illo cumque tenetur voluptate possimus eius incidunt. Inventore eaque praesentium atque non, placeat distinctio.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_2} alt="User 2" />
                                <div>
                                    <h3>William</h3>
                                    <span>Educity USA</span>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae mollitia tempore, quas laudantium asperiores placeat illum illo cumque tenetur voluptate possimus eius incidunt. Inventore eaque praesentium atque non, placeat distinctio.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_2} alt="User 2" />
                                <div>
                                    <h3>William</h3>
                                    <span>Educity USA</span>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae mollitia tempore, quas laudantium asperiores placeat illum illo cumque tenetur voluptate possimus eius incidunt. Inventore eaque praesentium atque non, placeat distinctio.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_2} alt="User 2" />
                                <div>
                                    <h3>William</h3>
                                    <span>Educity USA</span>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae mollitia tempore, quas laudantium asperiores placeat illum illo cumque tenetur voluptate possimus eius incidunt. Inventore eaque praesentium atque non, placeat distinctio.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_2} alt="User 2" />
                                <div>
                                    <h3>William</h3>
                                    <span>Educity USA</span>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae mollitia tempore, quas laudantium asperiores placeat illum illo cumque tenetur voluptate possimus eius incidunt. Inventore eaque praesentium atque non, placeat distinctio.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_3} alt="User 3" />
                                <div>
                                    <h3>William</h3>
                                    <span>Educity USA</span>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae mollitia tempore, quas laudantium asperiores placeat illum illo cumque tenetur voluptate possimus eius incidunt. Inventore eaque praesentium atque non, placeat distinctio.</p>
                            </div>
                        </div>
                    </li>
                    
                </ul>
            </div>
            <a href="">see more</a>
        </div>
    )
}

export default News;
