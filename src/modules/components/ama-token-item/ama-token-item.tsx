/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
// Dependencies
import { Badge, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FeaturedToken } from '../../home/models/featured-token';
import { Container, InfoContainer, LogoContainer, ReleaseContainer, TrustLevelContainer } from './ama-token-item.style';
import { differenceInDays, format, isEqual } from 'date-fns';
import moment from 'moment';
import { MdKeyboardVoice } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';



const tagNewConstraint = -14;

const AmaTokenItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean }> = (props) => {
    const [applyOpacity, setApplyOpacity] = useState('');
    const [diffDays, setDiffDays] = useState(0);
    const [isEqualDate, setIsEqualDate] = useState(false);


    useEffect(() => {
        const diff = differenceInDays(
            moment(props?.token?.AMADate as any).hour(0).minute(0).second(0).millisecond(0).add(1, 'day').toDate(),
            moment().utc().hour(0).minute(0).second(0).millisecond(0).add(1, 'day').toDate());
        setDiffDays(diff)
        if (diff < 0) {
            setApplyOpacity('past')
        } else {
            setApplyOpacity('')
        }
        calculateIsEqualDate();
    }, [props.token]);

    const calculateIsEqualDate = () => {
        const today = moment().utc().hour(0).minute(0).second(0).millisecond(0).add(1, 'day').toDate();
        const amaDate = moment(props?.token?.AMADate).hour(0).minute(0).second(0).millisecond(0).add(1, 'day').toDate();
        setIsEqualDate(isEqual(today, amaDate));
    }
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`token/${props?.token?.address}`, { state: { isUpcoming: true } });
    }

    useEffect(() => {
        moment.updateLocale("en", {
            relativeTime: {
                s: "Today",
                m: "%d m",
                mm: "%d m",
                h: "Today",
                hh: "Today",
                d: "Tomorrow",
                dd: "%d days",
                M: "Next Month",
                MM: "%d months",
                y: "Next Year",
                yy: "%d years",
                w: 'a week',
                ww: '$d weeks'
            },
            calendar: {
                sameDay: '[Today]',
                lastDay: '[Yesterday]',
                nextDay: '[Tomorrow]',
                nextWeek: '[test ] PP',
                sameElse: 'PP'
            }
        })
    }, [props.token])
    return <Container >
        <Link to={`token/${props?.token?.address}`}>
            {
                props?.token?.savingTime && diffDays > tagNewConstraint ?
                    <Badge count="NEW" offset={[-10, 5]} style={{ fontSize: '10px' }} >
                        <LogoContainer className={`${applyOpacity}`} >
                            <img src={props.token.logoPicture} width="50px" alt="" />
                            {
                                props.imageLoading && <div className="image-placeholder">
                                </div>
                            }
                        </LogoContainer>
                    </Badge>
                    :
                    <LogoContainer className={`${applyOpacity}`} >
                        <img src={props.token.logoPicture} width="50px" alt="" />

                        {
                            props.imageLoading && <div className="image-placeholder">
                            </div>
                        }
                    </LogoContainer>
            }
        </Link>
        <Link to={`token/${props?.token?.address}`}>
            <InfoContainer className={`${applyOpacity}`}>
                <a onClick={handleNavigate} className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>{props?.token?.currency?.name}</a>
                <span className=' symbol text-muted fw-bold d-block' >{props?.token?.currency?.symbol}</span>
            </InfoContainer>
        </Link>
        <Link to={`token/${props?.token?.address}`}>

            <ReleaseContainer className={`${applyOpacity}`}>
                <span className='released-title text-muted fw-bold d-block fs-8'>
                    When
                </span>
                <span className='text-dark fw-bolder d-block fs-7'>
                    {
                        isEqualDate && 'Today'
                    }
                    {
                        diffDays === 1 && 'Tomorrow'
                    }
                    {
                        diffDays === -1 && 'Yesterday'
                    }
                    {
                        ((props?.token?.AMADate) &&
                            diffDays !== -1) &&
                        diffDays !== 1 &&
                        !isEqualDate &&
                        format(moment(props?.token?.AMADate).utc().hour(0).minute(0).second(0).millisecond(0).add(1, 'day').toDate(), 'PP')
                    }
                </span>
            </ReleaseContainer>
        </Link>
        <TrustLevelContainer >
            <div>

                {
                    diffDays >= 0 ?
                        <Button className={isEqualDate ? 'today' : ''} href={'https://t.me/RoyalProof_Official'} type="ghost" style={{ background: '' }} target={'__blank'}> <MdKeyboardVoice size={25} />  </Button>
                        :
                        <Button type="ghost" target={'__blank'} href={props.token.AMALink}> <FaPlay size={15} />  </Button>

                }
            </div>
        </TrustLevelContainer>
    </Container >
};

export default AmaTokenItem;

