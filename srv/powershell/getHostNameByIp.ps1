param(
  $ipAddress
)
$hostName = [System.Net.Dns]::GetHostByAddress($ipAddress).HostName
Write-Host "$hostName"