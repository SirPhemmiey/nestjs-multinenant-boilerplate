import { TransformFnParams } from 'class-transformer/types/interfaces';
import { MaybeType } from 'utils/types/maybe.types';

export const LowerCaseTransformer = (
  params: TransformFnParams,
): MaybeType<string> => params.value?.toLowerCase().trim();
