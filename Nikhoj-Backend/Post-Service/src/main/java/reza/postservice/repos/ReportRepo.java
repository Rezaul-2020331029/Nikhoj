package reza.postservice.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import reza.postservice.domains.entities.Report;
@Repository

public interface ReportRepo extends JpaRepository<Report, Long> {
}
