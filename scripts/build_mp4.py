import asyncio
import os
import subprocess
from playwright.async_api import async_playwright

async def record_video():
    current_dir = os.path.abspath(os.path.dirname(__file__))
    project_dir = os.path.dirname(current_dir)
    html_file = f"file:///{project_dir.replace(os.sep, '/')}/index.html"
    
    output_dir = os.path.join(project_dir, ".tmp")
    os.makedirs(output_dir, exist_ok=True)

    print("Iniciando Playwright para grabación de pantalla en 1920x1080...")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            record_video_dir=output_dir,
            record_video_size={'width': 1920, 'height': 1080}
        )
        
        page = await context.new_page()
        print(f"Navegando a {html_file}")
        await page.goto(html_file, wait_until="networkidle")
        
        # Click on play button to trigger animation
        print("Iniciando animación...")
        await page.click("#playOverlay")
        
        # Wait 100 seconds (plus 2 seconds buffer) for the GSAP timeline
        print("Grabando video (102 segundos)...")
        await page.wait_for_timeout(102000)
        
        print("Cerrando navegador y guardando...")
        video_path = await page.video.path()
        await context.close()
        await browser.close()
        
    print(f"Video guardado temporalmente en: {video_path}")
    
    # Convert WebM to MP4 using ffmpeg
    mp4_path = os.path.join(project_dir, "Club_Manager_Pro_Demo.mp4")
    print(f"Convirtiendo a formato YouTube (.mp4): {mp4_path}")
    
    if os.path.exists(mp4_path):
        os.remove(mp4_path)
        
    ffmpeg_cmd = [
        "ffmpeg", "-y", "-i", video_path, 
        "-c:v", "libx264", "-preset", "fast", "-crf", "22",
        "-pix_fmt", "yuv420p", mp4_path
    ]
    
    subprocess.run(ffmpeg_cmd, check=True)
    
    # Cleanup webm
    if os.path.exists(mp4_path):
         os.remove(video_path)
         print(f"✅ Video generado con éxito: {mp4_path}")
    else:
         print("❌ Error en la conversión.")

if __name__ == "__main__":
    asyncio.run(record_video())
