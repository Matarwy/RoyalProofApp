// Dependencies
import React, { ReactNode, useEffect } from 'react';
import { Container } from './card.style';

const Card: React.FC<{
    children: ReactNode;min?: boolean
}>= (props) => {
    const classes: string = `${props?.min ? 'min' : ''} card card-flush mb-10`;

    useEffect(() => { }, []);

    return <Container className={classes}>
        {props.children}
    </Container>;
};

export default Card;

