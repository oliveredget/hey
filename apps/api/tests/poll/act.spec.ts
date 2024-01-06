import getAuthWorkerHeadersForTest from '@hey/lib/getAuthWorkerHeadersForTest';
import { TEST_URL } from '@utils/constants';
import axios from 'axios';
import { describe, expect, test } from 'vitest';

describe('polls/act', async () => {
  test('should act on a poll', async () => {
    const newPollResponse = await axios.post(
      `${TEST_URL}/polls/create`,
      { length: 1, options: ['option 1', 'option 2'] },
      { headers: await getAuthWorkerHeadersForTest() }
    );

    const response = await axios.post(
      `${TEST_URL}/polls/act`,
      {
        option: newPollResponse.data.poll.options[0].id,
        poll: newPollResponse.data.poll.id
      },
      { headers: await getAuthWorkerHeadersForTest() }
    );

    expect(response.data.id).toHaveLength(36);
  });
});
