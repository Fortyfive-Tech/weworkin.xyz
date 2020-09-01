---
id: how-it-works
title: How it works
---

## Architecture overview

![Architecture overview](/img/architecture.png)

Worth noticing that the **Backend** container is not exposed publicly. It just runs internally, in tandem with the **Hasura** container, supplying endpoints for actions and events. 

The **Client App** is totally decoupled, connecting to the whole system through the exposed GraphQL endpoint provided by Hasura. 

Both **Client App** and the **Hasura** container are served publicly, as the **Client App** needs the GraphQL endpoint up and running. 

## Hasura Actions and Events

By creating actions and events inside Hasura's GraphQL Engine, the GraphQL schema can be easily extended. You can read more about it at [Hasura's Actions Docs](https://hasura.io/docs/1.0/graphql/core/actions/index.html).

Currently, in Hasura's metadata, there are the following actions and events defined:


| Name | Type | Description |
| --- | --- | --- |
| `createPublicProfile` | `action` | Mutation for validating and creating a new profile. Also handles the relations between roles, locations and the created profile. By default, the newly created profiles are not public. |
| `SlackNotification` | `event` | Invoked when a new profile is submitted. Listens to the 'insert' trigger on the profiles table. |
| `PublishProfile` | `event` | Custom event to handle profile publication. When invoked, it sets the profile as public, along with the associated locations and roles. Can be invoked inside Hasura's Console. |

:::tip

Before invoking the `PublishProfile` event, please check all the information associated with the submitted profile. 