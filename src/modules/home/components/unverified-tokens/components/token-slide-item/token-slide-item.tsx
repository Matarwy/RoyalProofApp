// Dependencies
import { Popover, Tag } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FeaturedToken } from '../../../../models/featured-token';
import { AuditTokenSlideWrapper, Container } from './token-slide-item.style';

const TokenSlideItem: React.FC<{ token: Partial<FeaturedToken>, logoSize?: string, tagColor?: string }> = (props) => {
    useEffect(() => { }, []);

    return <Container>
        <AuditTokenSlideWrapper>
            <Link to={'/token/' + props?.token?.address}>
                <div className="logo">
                    <img width={props.logoSize ? props.logoSize : '70px'} src={props.token.logoPicture} alt="" />
                </div>
            </Link>
            <Link to={'/token/' + props?.token?.address}>
                <div className="name text-dark fw-bolder text-hover-primary mb-1 fs-6">{props.token.currency?.name}</div>

            </Link>
            <div className="symbol text-muted fs-6 fw-bold mt-1">{props.token.currency?.symbol}</div>
            <div className="tag">
                {
                    props.token.kyc &&
                    <Tag color="purple">
                        KYC
                    </Tag>
                }
                <Popover content={(props?.token?.scamReasonTooltip ? props?.token?.scamReasonTooltip : 'Want to be a trusted project? Contact RoyalProof for an audit!')}>
                    <Tag color={props.tagColor}>
                        {'Audited'}
                    </Tag>
                </Popover>
            </div>
        </AuditTokenSlideWrapper>
    </Container >;
};

export default TokenSlideItem;

