---
id: content
title: Managing content
---

## Content structure

The main entity are the user's profiles, located in the `profiles` table. Each profile can have an associated location, and multiple associated roles. Additional details regarding relations, permissions and how the content links togheter can be found in the "Data" section from Hasura console.

## Profile approval

The submitted profiles and the associated roles and locations are, by default, set to private. In order to publish a profile, after reviewing the profile's data, the `PublishProfile` event must be invoked. This will set the profile and all the associated roles and location to public. 

This event can be invoked "Via console", in Hasura. Read more about [console invoked events](https://hasura.io/docs/1.0/graphql/core/event-triggers/invoke-trigger-console.html).

## Prefilling roles

By default, there are no roles defined in the database. It is recommended to fill out some initial roles - it will greatly improve the user's experience by helping to decide which roles to fill on registration.

Roles can be prefilled with a simple SQL statement, which can be executed in Hasura Console -> Data -> SQL.


```sql title=""
INSERT INTO roles (slug, name, is_public) VALUES
  ('security-compliance', 'Security & Compliance', true),
  ('cargo-operations', 'Cargo Operations', true),
  ('airport-operations', 'Airport Operations', true);
```

