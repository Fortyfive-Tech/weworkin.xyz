import React, { useState } from 'react'
import styled from 'styled-components'
import Filters from './Filters'
import CardsArea from './CardsArea'

const FilterableGrid = () => {
    const [filters, setFilters] = useState({
        roles: null,
        location: null,
        openToRelocation: false,
        openToRemoteWork: false
    })

    return <Wrapper>
        <Filters 
            filtersState={filters}
            onChangeFilters={setFilters}
        />

        <CardsArea filters={filters}/>
    </Wrapper>
}

const Wrapper = styled.div`
    
`

export default FilterableGrid
