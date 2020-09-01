import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Masonry from 'react-masonry-css'
import ProfileCard from './ProfileCard'
import styled from 'styled-components'

const FETCH_PROFILES = gql`
    query fetchProfiles($where: profiles_bool_exp) {
        profiles(order_by: {created_at: desc}, where: $where) {
            id
            first_name
            last_name
            description
            position_title
            open_to_relocation
            linkedin_url
            resume_url
            website_url
            
            profiles_roles {
                role {
                    id
                    name
                }
            }
            location {
                id
                country
                city
            }
        }
    }
`

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
   

const CardsArea = ({filters}) => {
    const searchParams = new URLSearchParams(window.location.search)
    const profileId = searchParams.get('profileId')

    // Transform the current filters in order to pass the whole object as a parameter in the gql
    const mapFiltersToQueryTypes = () => {
        const roleFiltersValues = filters.roles ? filters.roles.map(item => item.value) : []
        const locationFiltersValues = filters.locations ? filters.locations.map(item => item.value) : []

        return {
            _and : {
                id: profileId ? {
                    _eq: profileId
                } : {},
                location_id: locationFiltersValues.length ? {
                    _in : locationFiltersValues
                } : {}, 
                profiles_roles: {
                    role_id: roleFiltersValues.length ? {
                        _in: roleFiltersValues
                    } : {}
                },
                open_to_relocation: filters.openToRelocation ? {
                    _eq : true
                } : {},
                open_to_remote_work: filters.openToRemoteWork ? {
                    _eq : true
                } : {}
            }
        }
    }

    const { loading, error, data } = useQuery(FETCH_PROFILES, {
        variables: {
            where : mapFiltersToQueryTypes()
        },
    })

    if (loading) return <div></div>
    if (error) return <p>Error :(</p>

    return <Wrapper>
        
        {data.profiles.length ? (
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="filterable-grid"
                columnClassName="filterable-grid_column">
                {data.profiles.map(profile => (
                    <ProfileCard key={profile.id} data={profile}/>
                ))}
            </Masonry>
        ) : (
            <p>No profiles available.</p>
        )}
    </Wrapper>
}

const Wrapper = styled.div`
    margin-top: 2.7rem;
`

export default CardsArea
