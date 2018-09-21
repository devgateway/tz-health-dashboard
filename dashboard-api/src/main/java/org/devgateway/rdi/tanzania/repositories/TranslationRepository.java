package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Translation;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Repository

public interface TranslationRepository extends JpaRepository<Translation, Long> {
    @Cacheable(cacheNames = "Translation")
    List<Translation> findByKey(String key);
}
