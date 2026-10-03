"""Create a portable English source package from an explicit file allowlist."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib

ROOT = Path(__file__).resolve().parents[1]
FILES = [
    "README.md", "DEMO_SCRIPT.md", "AGENTS.md", ".gitignore",
    "dist/index.html", "dist/run-latest.json", "runs/run-latest.json",
    "config/research_brief.json", "config/source_registry.json",
    "config/run-template.json", "prompts/ORCHESTRATOR.md",
    "prompts/RESEARCH_INTELLIGENCE.md", "scripts/check.mjs", "scripts/package.py",
]
DEST = ROOT / "dist/downloads/research-opportunity-lab-en.zip"

def main():
    for name in FILES:
        path = ROOT / name
        if not path.is_file() or path.is_symlink():
            raise RuntimeError(f"Missing or unsafe package input: {name}")
        content = path.read_text(encoding="utf-8")
        for forbidden in ("app" + "gprj_", "siwc_" + "bypass_bearer_token", "source_repository_" + "credential", "/Us" + "ers/", "BEGIN " + "PRIVATE KEY"):
            if forbidden in content:
                raise RuntimeError(f"Private or deployment-specific content in {name}")
    DEST.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(DEST, "w", ZIP_DEFLATED) as archive:
        for name in FILES:
            content = (ROOT / name).read_bytes()
            # A local copy has no nested download archive; replace its download
            # button with a direct link to the bundled English instructions.
            if name == "dist/index.html":
                page = content.decode("utf-8")
                page = page.replace('href="downloads/research-opportunity-lab-en.zip" download>Download source code</a>',
                                    'href="README.md" target="_blank" rel="noopener">Read setup guide</a>')
                content = page.encode("utf-8")
            archive.writestr("research-opportunity-lab-en/" + name, content)
        archive.writestr("research-opportunity-lab-en/dist/README.md", (ROOT / "README.md").read_bytes())
    with ZipFile(DEST) as archive:
        if archive.testzip() is not None:
            raise RuntimeError("Archive integrity check failed")
    digest = hashlib.sha256(DEST.read_bytes()).hexdigest()
    print(f"Created {DEST.name}: {DEST.stat().st_size:,} bytes; {len(FILES)+1} files")
    print(f"SHA-256: {digest}")

if __name__ == "__main__":
    main()
