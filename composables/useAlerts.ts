import { nanoid } from 'nanoid'

interface AlertOptions {
	type?: 'success' | 'error' | 'info' | 'warning'
	title?: string
	dismissiable?: boolean
	timeout?: number
}

interface Alert extends AlertOptions {
	message: string
	id: string
}

const alerts = ref<Alert[]>([])

export const useAlerts = () => {
	function alert(message: string, options: AlertOptions) {
		const alert = {
			id: nanoid(),
			message,
			timeout: 5000,
			dismissiable: true,
			...options
		}

		alerts.value.push(alert)

		if (alert.timeout) {
			setTimeout(() => dismiss(alert), alert.timeout)
		}
	}

	function dismiss(idOrAlert: string | Alert) {
		const id = typeof idOrAlert === 'string' ? idOrAlert : idOrAlert.id
		alerts.value = alerts.value.filter((alert) => alert.id !== id)
	}

	function success(message: string, options: AlertOptions = {}) {
		alert(message, { ...options, type: 'success' })
	}

	function error(message: string, options: AlertOptions = {}) {
		alert(message, { ...options, type: 'error' })
	}

	function info(message: string, options: AlertOptions = {}) {
		alert(message, { ...options, type: 'info' })
	}

	function warning(message: string, options: AlertOptions = {}) {
		alert(message, { ...options, type: 'warning' })
	}

	return {
		success,
		info,
		warning,
		error,
		alerts,
		dismiss
	}
}
