# This script finds all image files in the current directory to convert them into subdirectories wherever underscores are found in the filename. Example: "gallery_category_artist name_filename.ext" will be converted to "gallery/category/artist/name.jpg".

# Get all image files (jpg, png, gif, etc.) in the current directory
Get-ChildItem -Path . -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png|gif|bmp)$' } | ForEach-Object {
    $originalPath = $_.FullName
    $filename = $_.BaseName
    $extension = $_.Extension

    # Split the filename by underscores
    $parts = $filename -split '_'

    # If there are no underscores, skip
    if ($parts.Count -le 1) { return }

    # Build the new directory path (all parts except the last)
    $dirPath = ".\" + ($parts[0..($parts.Count - 2)] -join "\")

    # The last part is the new filename
    $newFilename = "$($parts[-1])$extension"

    # Create the directory if it doesn't exist
    if (-not (Test-Path -Path $dirPath)) {
        New-Item -Path $dirPath -ItemType Directory | Out-Null
    }

    # Build the new file path
    $newPath = Join-Path -Path $dirPath -ChildPath $newFilename

    # Move the file
    Move-Item -Path $originalPath -Destination $newPath
}