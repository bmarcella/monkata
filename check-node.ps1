$nodePath = "C:\Program Files\nodejs\node.exe"

if (Test-Path $nodePath) {
    Write-Output "Node.js is installed at $nodePath"
    $env:Path += ";C:\Program Files\nodejs"
    [System.Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::Machine)
    Write-Output "Node.js path added to the environment variables."
} else {
    Write-Output "Node.js is not installed. Please download and install it from https://nodejs.org/"
}
