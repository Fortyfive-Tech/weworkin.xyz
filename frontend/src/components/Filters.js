import React, { useRef } from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import Select from 'react-select'
import { theme, device } from '../config/theme'
import { CheckBox } from './common'

const FETCH_FILTERS_VALUES = gql`
    query fetchFiltersValue {
        locations {
            id
            city
            country
        }
        roles(order_by: {name: asc}) {
            id
            name
            slug
        }
    }
`

const Filters = ({onChangeFilters, filtersState}) => {
    const { loading, error, data } = useQuery(FETCH_FILTERS_VALUES)

    // These values are constant, prevent regroup and sort in every render
    const locationsByCountryFormatted = useRef(null)

    if (loading) return <div style={{minHeight: '100px'}}></div>
    if (error) return <p>Error :(</p>

    // Map response to react-select component input format
    const rolesList = data.roles.map(role => {
        return {
            value : role.id,
            label : role.name
        }
    })

    if(!locationsByCountryFormatted.current) {

        // Group locations by country name
        const locationsByCountry = data.locations.reduce((acc, curr) => {
            const lcCountry = curr.country.toLowerCase()
            if(!acc[lcCountry]) acc[lcCountry] = []; //If this type wasn't previously stored
    
            acc[lcCountry].push({
                value : curr.id,
                label : curr.city,
                // Include country name in each option, in order to improve performance by avoiding too many iterations on search
                country : lcCountry
            });
            return acc
        },{})

        // Format grouped locations to fit react-selects' input
        locationsByCountryFormatted.current = Object.keys(locationsByCountry).map((idx) => {
            return {
                label: idx,
                options: locationsByCountry[idx]
            }
        }).sort((a, b) => a.label.localeCompare(b.label))
    }
    

    // [event.name] is passed from react-select "name" attribute
    // Merge existing filter entries with the new selection
    const processChange = (selection, event) => {
        const newFilter = {
            [event.name]: selection
        }

        onChangeFilters({
            ...filtersState,
            ...newFilter
        })
    }

    const processToggle = (changeEvent) => {
        const { name } = changeEvent.target

        const newFilter = {
            [name]: !filtersState[name]
        }

        onChangeFilters({
            ...filtersState,
            ...newFilter
        })
    }

    const filterOptions = (result, input) => {

        const searchString = input.toLowerCase()
        const candidate = result.label.toLowerCase()

        // Return regular results (when search string is included in label)
        if (candidate.includes(searchString)) return true

        // Check if search string is inside the countries list
        const countrySearch = locationsByCountryFormatted.current.find(group => {
            return group.label.includes(searchString)
        })

        // Return all items that have a match with the parent country
        if(countrySearch) { 
            return result.data.country.includes(countrySearch.label)
        }
    }

    return <Wrapper>
        <TagsFiltersContainer>
            <TagsSelectionField>
                <Select
                    defaultValue={null}
                    placeholder="All departments"
                    isMulti
                    name="roles"
                    options={rolesList}
                    value={filtersState.roles}
                    onChange={processChange}
                />    
            </TagsSelectionField>
            
            <TagsSelectionField>
                <Select
                    defaultValue={null}
                    placeholder="All locations"
                    isMulti
                    name="locations"
                    options={locationsByCountryFormatted.current}
                    value={filtersState.locations}
                    onChange={processChange}
                    filterOption={filterOptions}
                />    
            </TagsSelectionField>
        </TagsFiltersContainer>

        <CheckboxSelectionContainer>
            <CheckBox>
                <input
                    name="openToRelocation"
                    type="checkbox"
                    checked={filtersState.openToRelocation}
                    onChange={processToggle} 
                />
                Open to relocation
            </CheckBox>

            <CheckBox>
                <input
                    name="openToRemoteWork"
                    type="checkbox"
                    checked={filtersState.openToRemoteWork}
                    onChange={processToggle} 
                />
                Open to remote work
            </CheckBox>
        </CheckboxSelectionContainer>
    
    </Wrapper>
}

const Wrapper = styled.div`
    width:100%;
    padding:0;
    margin:${theme.spacing._60} 0;
`

const TagsFiltersContainer = styled.div`
    @media ${device.laptop} {
        display:flex;
    }
`

const TagsSelectionField = styled.div`
    margin-bottom:${theme.spacing._20};

    @media ${device.laptop} {
        flex: 0 1 30%;
        padding-right:${theme.spacing._20};
    }
`

const CheckboxSelectionContainer = styled.div`
    padding-top:${theme.spacing._10};
    
    > * {
        margin-bottom:${theme.spacing._20};
    }

    @media ${device.laptop} {
        display:flex;
        justify-content:flex-start;

        > * {
            margin-bottom:0;
            padding-right:${theme.spacing._20};
        }
    }
`

export default Filters
