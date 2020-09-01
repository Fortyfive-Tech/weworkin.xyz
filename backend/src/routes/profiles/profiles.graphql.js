import { gql } from 'graphql-request'

export const CREATE_PROFILE = gql`mutation createProfile($object: profiles_insert_input!) {
    insert_profiles_one(object: $object) {
      last_name
      first_name
    }
}`

export const PUBLISH_PROFILE = gql`mutation publishProfile($id: uuid_comparison_exp) {
  update_profiles(where: {id: $id}, _set: {is_public: true}) {
    returning {
      first_name
      last_name
    }
  }
  update_roles(where: {roles_profiles: {profile_id: $id}}, _set: {is_public: true}) {
    returning {
      name
    }
  }
  update_locations(where: {profiles: {id: $id}}, _set: {is_public: true}) {
    returning {
      country
      city
    }
  }
}`
