// Dependencies
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Container } from './ticker.style';
import Ticker from 'react-ticker'
import { Popover } from 'antd';
const TickerComponent: React.FC = () => {
    const [tokens, setTokens] = useState<any[]>([]);
    const [stopped, setStopped] = useState<any>();
    useEffect(() => {
        fetchTokens();
    }, []);

    const fetchTokens = () => {
        axios.get('https://api.royalproof.net/network/ticker').then(
            ({ data }) => {
                setTokens(data);
                setTokens(data.map(
                    token => {
                        let price = token.price;
                        const index = (price as number).toString().indexOf('e')
                        if (index !== -1 || index > 0) {
                            price = token.price.toString().slice(0, index - 1);
                        }
                        return {
                            logo: token.logo,
                            symbol: token.symbol,
                            link: token.link,
                            price: price,
                            numberOfDigits: token.numberOfDigits
                        }

                    }
                ))
            }
        )
    }
    return tokens && tokens?.length > 0 ? <Container onMouseEnter={() => {
        setStopped(true)
    }

    }
        onMouseLeave={() => setStopped(false)}
        onTouchStart={() => setStopped(true)}
        onTouchEnd={() => setStopped(false)}
    >
        {<Ticker mode="chain" move={!stopped} speed={7}>
            {() =>
                tokens?.map((token, i) =>
                    <div key={i} className="items-wrapper">
                        <a onClick={()=>setStopped(false)} href={token.link} target="_blank" rel="noreferrer">
                            <div className="item">
                                <Popover content={<span>{token.symbol}</span>} >
                                    <div className="logo">
                                        <img style={{ borderRadius: '100%' }} width={20} src={token.logo} alt="" />
                                    </div>
                                </Popover>
                                <div className="price">
                                    {new Intl.NumberFormat('en-US', {
                                        maximumFractionDigits: token.numberOfDigits,
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(token?.price)}</div>
                                {/* <div className="increase" style={{ color: `${(token.variation > 0) ? 'green' : 'red'}` }}>{Number(token?.variation).toFixed(1)}%</div> */}
                            </div>
                        </a>
                    </div>
                )
            }
        </Ticker>}
    </Container > : null;
};

export default TickerComponent;

