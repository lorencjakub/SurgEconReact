import React, { FC } from "react"
import { styled } from '@mui/material/styles';
import { Paper, Typography, Box } from '@mui/material';

const StyledCard = styled(Paper)(({ theme, color }) => ({
    width: 256,
    height: 256,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: color,
    border: `1px solid ${theme.palette.divider}`,
    transition: 'box-shadow 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: theme.shadows[2],
    },
}));

const TreatmentName = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    display: 'inline',
}));

const InfoValue = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    marginLeft: theme.spacing(1),
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
    display: 'inline',
}));

const Description = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
}));

interface RoomCardProps {
    id: string,
    identifier: string;
    status: string,
    onClick: (id: string) => void;
}

const RoomCard: FC<RoomCardProps> = ({ id, identifier, status, onClick }) => {
    const handleClick = () => {
        onClick(id);
    };

    var color = "green"
    console.debug(status)
    if (status != "available") color = "red"

    return (
        <StyledCard onClick={handleClick} color={color} >
            <TreatmentName variant="h3">
                {identifier}
            </TreatmentName>

            <Box sx={{ mb: 1 }}>
                <InfoLabel>Počet kroků:</InfoLabel>
            </Box>

            <Description>
                {status}
            </Description>
        </StyledCard>
    );
};

export default RoomCard;