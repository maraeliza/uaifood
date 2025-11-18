import { PageableDto } from '../../pagination/pageable.dto';

export class FindAllUsersDto extends PageableDto {
  constructor(partial: Partial<FindAllUsersDto>) {
    super();
    Object.assign(this, partial);
  }

  name?: string;
  phone?: string;
}
