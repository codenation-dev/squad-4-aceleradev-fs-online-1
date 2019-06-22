package alert

type AlertRepository interface {
	SaveAlert(alert Alert) error
	FindAlerts(alert Alert) ([]Alert, error)
	CountAlerts() (int, error)
}
