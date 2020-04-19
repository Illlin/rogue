package uk.co.zacgarby.roguelike.world;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;

import uk.co.zacgarby.roguelike.world.tiles.Wall;

public class Level {
	public Tile[][] tiles;
	public int width, height;
	
	public Level(int w, int h) {
		width = w;
		height = h;
		
		tiles = new Tile[h][w];
		
		for (int i = 0; i < w; i++) {
			for (int j = 0; j < h; j++) {
				tiles[j][i] = new Wall(i, j);
			}
		}
	}
	
	public void draw(SpriteBatch batch, int camX, int camY) {
		for (int i = 0; i < width; i++) {
			for (int j = 0; j < height; j++) {
				int sx = -camX + i * 10;
				int sy = -camY + j * 10;
				if (sx < -10 || sx > 180 || sy < -10 || sy > 210) {
					continue;
				}
				
				tiles[j][i].draw(batch, sx, sy);
			}
		}
	}
	
	public void drawlight(SpriteBatch batch, int camX, int camY) {
		for (int i = 0; i < width; i++) {
			for (int j = 0; j < height; j++) {
				int sx = -camX + i * 10;
				int sy = -camY + j * 10;
				if (sx < 0 || sx >= 170 || sy < 0 || sy >= 200) {
					continue;
				}
				
				tiles[j][i].drawlight(batch, sx, sy);
			}
		}
	}
	
	public Tile at(int x, int y) {
		if (x < 0 || x >= width || y < 0 || y >= height) {
			return null;
		}
		
		return tiles[y][x];
	}
	
	public void initialise() {
		for (int x = 0; x < width; x++) {
			for (int y = 0; y < height; y++) {
				tiles[y][x].initialise(this);
			}
		}
	}
}
