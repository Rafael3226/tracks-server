import { CoreException } from '@src/shared/core/exceptions/core.exception';

export class GenreNotFoundException extends CoreException {
  constructor(id: string) {
    super(`Genre with id ${id} not found.`);
  }
}
