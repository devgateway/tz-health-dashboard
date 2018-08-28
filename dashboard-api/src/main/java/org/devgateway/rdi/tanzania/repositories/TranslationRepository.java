package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Translation;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Sebastian Dimunzio
 */

@Repository

public interface TranslationRepository extends JpaRepository<Translation, Long> {
    @Cacheable(cacheNames = "Translation")
    Translation findByKey(String key);
}
