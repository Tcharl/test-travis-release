package io.github.jhipster.sample.service.mapper;

import io.github.jhipster.sample.domain.*;
import io.github.jhipster.sample.service.dto.FieldTestMapstructEntityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FieldTestMapstructEntity and its DTO FieldTestMapstructEntityDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FieldTestMapstructEntityMapper extends EntityMapper<FieldTestMapstructEntityDTO, FieldTestMapstructEntity> {

    

    

    default FieldTestMapstructEntity fromId(Long id) {
        if (id == null) {
            return null;
        }
        FieldTestMapstructEntity fieldTestMapstructEntity = new FieldTestMapstructEntity();
        fieldTestMapstructEntity.setId(id);
        return fieldTestMapstructEntity;
    }
}
