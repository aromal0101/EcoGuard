import React, { useRef, useState } from 'react'
import './News.css'
import Next_icon from '../../assets/next-icon.png'
import Back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/p1.jpg'
import user_2 from '../../assets/p2.jpg'
import user_3 from '../../assets/p3.jpg'
import user_4 from '../../assets/p4.jpg'
import user_5 from '../../assets/p5.jpg'
import user_6 from '../../assets/p6.jpg'


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
                                    <h3>Tourism for Rare Mammals </h3>
                                    <span>1 Nov 2024</span>
                                </div>
                            </div>
                            <div>
                                <p>At the turn of this century, seeing a wild jaguar was exceptionally difficult. People driving through the Jaguar Ecological Reserve in the Pantanal in Brazil would very occasionally get a glimpse of one crossing the road, but photographing them in the wild was considered almost impossible...  <span>see more</span></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_2} alt="User 2" />
                                <div>
                                    <h3>Langurs in Bangladesh face extinction</h3>
                                    <span>28 Jan 2023</span>
                                </div>
                            </div>
                            <div>
                                <p>A recent study revealed a troubling trend among the wild monkey population in Bangladesh’s northeastern forests. The study, conducted by the German Primate Centre, unveiled a concerning tendency of hybridization between Phayre’s langurs (Trachypithecus phayrei) and capped langurs (Trachypit ....<span>see more</span></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_3} alt="User 3" />
                                <div>
                                    <h3>Tribal Leader's Mission to Save the Philippines’ Endangered National Bird</h3>
                                    <span>24 Oct 2024</span>
                                </div>
                            </div>
                            <div>
                                <p>under the watch of the 64-year-old chieftain, more than a dozen critically endangered Philippine eagles, the country’s national bird, have hatched and survived in the wild since the mid-1980s. He was in his 20s when he first encountered a pair of Philippine eagles (Pithecophaga jefferyi) within... <span>see more</span></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_4} alt="User 4" />
                                <div>
                                    <h3>Poll: Voters Want Next U.S. President to Prioritize Wildlife Conservation</h3>
                                    <span>8 Oct 2024</span>
                                </div>
                            </div>
                            <div>
                                <p>America’s Endangered Species Act was weakened in 2019 through a series of sweeping changes. In March, previous protections were put back in place, and now a new poll shows conservatives and liberals across the nation overwhelmingly want the next U.S. President and Congress to do even more to protect ... <span>see more</span></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_5} alt="User 5" />
                                <div>
                                    <h3>Rising Human-Elephant Conflicts in Sumatra Heighten Electric Fence Risks</h3>
                                    <span>12 Jun 2024</span>
                                </div>
                            </div>
                            <div>
                                <p>LCENTRAL ACEH, Indonesia — Mak Besan dropped a clutch of cayenne peppers picked from a neighbor’s land in Karang Ampar village into a white canvas bag, her head protected from the elements by a heavy, patterned shawl.Mak Besan’s plot of subsistence land here on Indonesia’s main western island of Sumatra... <span>see more</span></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_6} alt="User 6" />
                                <div>
                                    <h3>Institutional Disputes Threaten Spix’s Macaw Reintroduction Success</h3>
                                    <span>13 Aug 2024</span>
                                </div>
                            </div>
                            <div>
                                <p>RIO DE JANEIRO — In 2022, the Spix’s macaw, one of the world’s most threatened parrots, started being reintroduced into Brazil’s semiarid Caatinga biome. The species, Cyanopsitta spixii, disappeared from its native habitat in 2000, when the last known wild Spix’s died... <span>see more</span></p>
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
