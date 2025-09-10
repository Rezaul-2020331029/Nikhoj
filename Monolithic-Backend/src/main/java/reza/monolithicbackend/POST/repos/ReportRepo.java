package reza.monolithicbackend.POST.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reza.monolithicbackend.POST.domains.entities.Report;

@Repository

public interface ReportRepo extends JpaRepository<Report, Long> {
}
