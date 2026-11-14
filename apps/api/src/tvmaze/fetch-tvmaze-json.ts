import { BadGatewayException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

const REQUEST_TIMEOUT_MS = 10_000;

const toHttpException = (status: number): HttpException => {
  if (status === HttpStatus.NOT_FOUND) return new NotFoundException('Show not found');
  if (status === HttpStatus.TOO_MANY_REQUESTS) {
    return new HttpException('TVMaze is limiting requests', HttpStatus.TOO_MANY_REQUESTS);
  }
  return new BadGatewayException(`TVMaze responded with error ${status}`);
};

export const fetchTvMazeJson = async <T>(url: URL): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    throw new BadGatewayException('TVMaze is unreachable');
  }

  if (!response.ok) throw toHttpException(response.status);

  return (await response.json()) as T;
};
