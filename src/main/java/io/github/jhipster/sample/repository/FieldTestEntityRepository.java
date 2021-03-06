package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.FieldTestEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FieldTestEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestEntityRepository extends JpaRepository<FieldTestEntity, Long> {

}
