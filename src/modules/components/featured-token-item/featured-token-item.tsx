/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import { Popover, Tag } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FeaturedToken } from '../../home/models/featured-token';
import { Container, InfoContainer, KYCBadge, LogoContainer, ReleaseContainer, TrustLevelContainer } from './featured-token-item.style';

const FeaturedTokenItem: React.FC<{ token: FeaturedToken, imageLoading?: boolean }> = (props) => {
    useEffect(() => { }, []);
    const trustLevelBgColor = {
        'Level 1': '#fff8dd',
        'Level 2': '#E6F4F1',
        'Level 3': '#f1faff',
    }

    const trustLevelTextColor = {
        'Level 1': '#b39019',
        'Level 2': '#65a0a7',
        'Level 3': '#129edb',
    }
    return <Link to={`/token/${props.token.address}`}>
        <Container>
            <LogoContainer>
                <img src={props.token.logoPicture} width="50px" alt="" />
                {
                    props.imageLoading && <div className="image-placeholder">
                    </div>
                }
            </LogoContainer>
            <InfoContainer>
                <Link to={`/token/${props.token.address}`}>
                    <a className='text-dark fw-bolder text-hover-primary mb-1 fs-6' >{props?.token?.currency?.name}</a>
                </Link>
                <span className=' symbol text-muted fw-bold d-block' >{props?.token?.currency?.symbol}</span>
            </InfoContainer>
            <KYCBadge>
                {
                    props.token?.kyc &&
                    <Tag color="purple">
                        KYC
                    </Tag>
                }
            </KYCBadge>
            <ReleaseContainer>
                <span className='released-title text-muted fw-bold d-block fs-8'>
                    Released
                </span>
                <span className='text-dark fw-bolder d-block fs-7'>{props?.token?.releaseDate}</span>
            </ReleaseContainer>
            <TrustLevelContainer>
                <Popover content={<span>Awarded RoyalProof's Certificate of Trust: {props?.token?.trustLevel ? props?.token?.trustLevel : 'L   evel 1'}</span>} >
                    <Tag
                        color={(trustLevelBgColor as any)[props?.token?.trustLevel ? props?.token?.trustLevel : 'Level 1']}
                        style={{ color: (trustLevelTextColor as any)[props?.token?.trustLevel ? props?.token?.trustLevel : 'Level 1'], fontWeight: 600 }}
                    >
                        Trust {props?.token?.trustLevel ? props?.token?.trustLevel : 'Level 1'}
                    </Tag>
                </Popover>
            </TrustLevelContainer>
        </Container>
    </Link>
};

export default FeaturedTokenItem;

