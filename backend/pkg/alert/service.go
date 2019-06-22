package alert

type Service interface {
	FindAlerts(alert Alert) ([]Alert, error)
	SaveAlerts(alerts []Alert) error
	CountAlerts() (int, error)
}

type AlertService struct {
	repo AlertRepository
}

func NewAlertService(repo AlertRepository) *AlertService{
	return &AlertService{
		repo: repo,
	}
}

func (s *AlertService) SaveAlerts(alerts []Alert) error {
	for _, alert := range alerts {
		s.repo.SaveAlert(alert)
	}
	return nil
}

func (s *AlertService) FindAlerts(alert Alert) ([]Alert, error) {
	return s.repo.FindAlerts(alert)
}

func (s *AlertService) CountAlerts() (int, error) {
	return s.repo.CountAlerts()
}
