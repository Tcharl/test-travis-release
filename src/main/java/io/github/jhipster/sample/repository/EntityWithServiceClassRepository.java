package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.EntityWithServiceClass;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EntityWithServiceClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceClassRepository extends JpaRepository<EntityWithServiceClass, Long> {

}
