// Dependencies
import React, { useEffect } from 'react';
import { Container } from './powered-by.style';

import RoyalProofLogo from '../../../assets/core/RoyalProof.png'

const PoweredBy: React.FC<{ company: string, logo?: string, link?: string }> = (props) => {
    useEffect(() => { }, []);

    const companyLogo: any = {
        'royalproof': RoyalProofLogo,
    }

    return <Container >
            <img width={'30px'} height={'30px'} src={companyLogo[props.company as any]} alt="" />
            <span className='text-muted mb-1'>Hunted by {props?.company}</span>

    </Container>;
};

export default PoweredBy;

