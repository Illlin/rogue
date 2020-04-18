package uk.co.zacgarby.roguelike.world.tiles;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

import uk.co.zacgarby.roguelike.Main;
import uk.co.zacgarby.roguelike.world.Level;
import uk.co.zacgarby.roguelike.world.Tile;

public class Wall extends Tile {
	private static final Color border = new Color(0x131211ff);
	
	private static Texture template = new Texture(Gdx.files.internal("images/tiles/wall.png"));
	private static Texture light    = new Texture(Gdx.files.internal("images/tiles/wall.light.png"));
	private static Texture[] textures = new Texture[16];
	private static boolean texturesGenerated = false;
	
	private Texture tex;
	
	public Wall(int x, int y) {
		this.x = x;
		this.y = y;
		this.passable = false;
		
		if (!texturesGenerated) {
			generateTextures();
		}
	}
	
	@Override
	public void draw(SpriteBatch batch, int sx, int sy) {		
		batch.draw(tex, sx, sy);
	}
	
	@Override
	public void drawlight(SpriteBatch batch, int sx, int sy) {		
		batch.draw(light, sx, sy);
	}
	
	@Override
	public void initialise(Level level) {
		int ti = 0;
		ti |= (level.at(x, y-1) instanceof Wall ? 1 : 0) << 0;
		ti |= (level.at(x+1, y) instanceof Wall ? 1 : 0) << 1;
		ti |= (level.at(x, y+1) instanceof Wall ? 1 : 0) << 2;
		ti |= (level.at(x-1, y) instanceof Wall ? 1 : 0) << 3;
		tex = textures[ti];
	}
	
	private void generateTextures() {
		if (!template.getTextureData().isPrepared()) {
			template.getTextureData().prepare();
		}
		
		Pixmap temp = template.getTextureData().consumePixmap();
		
		int wid = template.getWidth();
		int hei = template.getHeight();
		
		for (int i = 0; i < 16; i++) {
			Pixmap pm = new Pixmap(wid, hei, temp.getFormat());
			for (int x = 0; x < wid; x++) {
				for (int y = 0; y < hei; y++) {
					pm.drawPixel(x, y, temp.getPixel(x, y));
				}
			}
			
			boolean n = (i & 0b0001) > 0;
			boolean e = (i & 0b0010) > 0;
			boolean s = (i & 0b0100) > 0;
			boolean w = (i & 0b1000) > 0;
			
			pm.setColor(border);
			
			if (!n) {
				pm.drawLine(0, hei-1, wid-1, hei-1);
			}
			
			if (!e) {
				pm.drawLine(wid-1, hei-1, wid-1, 0);
			}
			
			if (!s) {
				pm.drawLine(0, 0, wid-1, 0);
			}
			
			if (!w) {
				pm.drawLine(0, 0, 0, hei-1);
			}
			
			textures[i] = new Texture(pm);
		}
		
		texturesGenerated = true;
	}
}
