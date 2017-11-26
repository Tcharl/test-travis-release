package io.github.jhipster.sample.service.mapper;

import io.github.jhipster.sample.domain.*;
import io.github.jhipster.sample.service.dto.EntityWithServiceClassAndDTODTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EntityWithServiceClassAndDTO and its DTO EntityWithServiceClassAndDTODTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EntityWithServiceClassAndDTOMapper extends EntityMapper<EntityWithServiceClassAndDTODTO, EntityWithServiceClassAndDTO> {

    

    

    default EntityWithServiceClassAndDTO fromId(Long id) {
        if (id == null) {
            return null;
        }
        EntityWithServiceClassAndDTO entityWithServiceClassAndDTO = new EntityWithServiceClassAndDTO();
        entityWithServiceClassAndDTO.setId(id);
        return entityWithServiceClassAndDTO;
    }
}
