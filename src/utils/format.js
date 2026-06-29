import { formatDate } from '@/utils/date'

export function formatNumber (value) {
  return new Intl.NumberFormat('id-ID').format(Number(value || 0))
}

export function formatDateTime (value) {
  return formatDate(value)
}

export function statusColor (status) {
  return {
    active: 'success',
    draft: 'warning',
    archived: 'grey',
  }[status || 'draft']
}
