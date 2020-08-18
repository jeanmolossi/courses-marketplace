import React, { useCallback, useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import api from '@shared/services/api';

import { Container, VoteButton, VotesTotal } from './styles';

interface VotesProps {
  commentId: string;
  votes: number;
}

const Votebox: React.FC<VotesProps> = ({ votes: payloadVotes, commentId }) => {
  const [votes, setVotes] = useState(payloadVotes);
  const [disabled, setDisabled] = useState(false);

  const handleVoteUp = useCallback(async () => {
    try {
      const { data } = await api.post(`votes/vote`, { commentId, type: 'up' });
      if (data) {
        setVotes(votes + 1);
        setDisabled(!disabled);
      }
    } catch (error) {
      setDisabled(!disabled);
    }
  }, [commentId, votes, disabled]);

  const handleVoteDown = useCallback(async () => {
    const { data: status } = await api.delete(`votes/unvote`, {
      params: { commentId },
    });
    if (status) {
      setVotes(votes - 1);
      setDisabled(!disabled);
    }
  }, [commentId, votes, disabled]);

  return (
    <Container>
      <VoteButton disabled={disabled} onClick={() => handleVoteUp()}>
        <FiChevronUp />
      </VoteButton>
      <VotesTotal>{votes}</VotesTotal>
      <VoteButton disabled={!disabled} onClick={() => handleVoteDown()}>
        <FiChevronDown />
      </VoteButton>
    </Container>
  );
};

export default Votebox;
