/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type CreateFlagInput = {
  name: Scalars['String']['input'];
};

export type CreateParticipantInput = {
  name: Scalars['String']['input'];
};

export type CreateResourceInput = {
  flagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  parentId?: InputMaybe<Scalars['Float']['input']>;
  participantIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<ResourceStatusGql>;
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Flag = {
  __typename?: 'Flag';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  resources: Array<Resource>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GetRandomResourceInputDto = {
  initialIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  size: Scalars['Int']['input'];
};

export type GetRandomResourceOutputDto = {
  __typename?: 'GetRandomResourceOutputDto';
  ids: Array<Scalars['Int']['output']>;
  resources: Array<Resource>;
};

export type GetResourceInputDto = {
  id: Scalars['Int']['input'];
};

export type ListResourcesInputDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  participantId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<ResourceStatusGql>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFlag: Flag;
  createParticipant: Participant;
  createResource: Resource;
  updateFlag: Flag;
  updateParticipant: Participant;
  updateResource: Resource;
};

export type MutationCreateFlagArgs = {
  data: CreateFlagInput;
};

export type MutationCreateParticipantArgs = {
  data: CreateParticipantInput;
};

export type MutationCreateResourceArgs = {
  data: CreateResourceInput;
};

export type MutationUpdateFlagArgs = {
  data: UpdateFlagInput;
};

export type MutationUpdateParticipantArgs = {
  data: UpdateParticipantInput;
};

export type MutationUpdateResourceArgs = {
  data: UpdateResourceInput;
};

export type Participant = {
  __typename?: 'Participant';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  resources: Array<Resource>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getRandomResources: GetRandomResourceOutputDto;
  getResource: Resource;
  listFlags: Array<Flag>;
  listParticipants: Array<Participant>;
  listResources: Array<Resource>;
};

export type QueryGetRandomResourcesArgs = {
  input: GetRandomResourceInputDto;
};

export type QueryGetResourceArgs = {
  input: GetResourceInputDto;
};

export type QueryListResourcesArgs = {
  input: ListResourcesInputDto;
};

export type Resource = {
  __typename?: 'Resource';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  flags?: Maybe<Array<Flag>>;
  id: Scalars['Int']['output'];
  participants?: Maybe<Array<Participant>>;
  status: ResourceStatusGql;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
};

export enum ResourceStatusGql {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Not_Found = 'NOT_FOUND',
  Deleted = 'DELETED',
}

export type UpdateFlagInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateParticipantInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateResourceInput = {
  flagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  id: Scalars['Int']['input'];
  participantIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  status: ResourceStatusGql;
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};
