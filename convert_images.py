import os
from PIL import Image

# Target directory
img_dir = "assets/img"

# Get all files in directory
for filename in os.listdir(img_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        file_path = os.path.join(img_dir, filename)
        name, ext = os.path.splitext(filename)
        output_path = os.path.join(img_dir, f"{name}.webp")
        
        try:
            with Image.open(file_path) as img:
                # Convert to RGB if necessary (e.g. PNG with transparency)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGBA")
                
                # Save as WebP
                img.save(output_path, "webp", quality=80)
                
                # Calculate size reduction
                original_size = os.path.getsize(file_path)
                new_size = os.path.getsize(output_path)
                reduction = (1 - new_size / original_size) * 100
                
                print(f"Converted: {filename} -> {name}.webp (Size: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB, -{reduction:.1f}%)")
        except Exception as e:
            print(f"Error converting {filename}: {e}")
